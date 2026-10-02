# Deploying HostelBite on Oracle Cloud Infrastructure (OCI) using Docker

This guide covers everything you need to deploy the HostelBite application (Frontend, Backend, and MySQL Database) on a free-tier Oracle Cloud Virtual Machine using Docker.

## Step 1: Prepare Your Project for Docker (Already Done For You!)
I have automatically created the necessary Docker files in your project directory:
1. `Dockerfile` (for the React Frontend)
2. `backend/Dockerfile` (for the Node.js Backend)
3. `nginx.conf` (to configure routing for the React frontend)
4. `docker-compose.yml` (to orchestrate the Frontend, Backend, and MySQL database containers)

*Make sure you commit and push these new files to your GitHub repository before proceeding to step 2.*
```bash
git add .
git commit -m "chore: add docker configuration files"
git push origin main
```

## Step 2: Create a Compute Instance on Oracle Cloud (OCI)

1. Log in to your [Oracle Cloud Console](https://cloud.oracle.com/).
2. Click the hamburger menu (top-left) > **Compute** > **Instances**.
3. Click **Create Instance**.
4. **Name your instance:** (e.g., `hostelbite-server`).
5. **Image and Shape:**
   - **Image:** Click "Edit", select **Ubuntu**, and choose **Ubuntu 22.04 LTS**.
   - **Shape:** Click "Edit". You can select the **Always Free** Micro instance (AMD) OR the **Always Free** ARM instance (Ampere A1 Compute). *The Ampere A1 gives you up to 4 OCPUs and 24GB RAM, which is excellent for running Docker.*
6. **Networking:**
   - Leave the default VCN and Subnet.
   - Ensure **"Assign a public IPv4 address"** is selected.
7. **Add SSH keys:**
   - Select **"Generate a key pair for me"** and click **"Save private key"**. This will download a `.key` file to your computer. **DO NOT LOSE THIS FILE**, it is the only way to log into your server.
8. Click **Create** at the bottom. Wait a few minutes for the status to turn green (**Running**).
9. Copy your instance's **Public IP Address** from the instance details page.

---

## Step 3: Open Firewall Ports on Oracle Cloud
By default, Oracle blocks all incoming web traffic. We need to open ports `80` (HTTP), `4000` (Backend API), and `3306` (Database, optional but helpful).

1. On your Instance details page, click on the **Subnet** link (it looks like `subnet-xxxx`).
2. Click on the **Security List** (it looks like `Default Security List for vcn-xxxx`).
3. Click **Add Ingress Rules**.
4. Create the following rule to allow HTTP (Frontend) traffic:
   - **Source CIDR:** `0.0.0.0/0`
   - **IP Protocol:** `TCP`
   - **Destination Port Range:** `80`
5. Click **+ Another Ingress Rule** to allow Backend traffic:
   - **Source CIDR:** `0.0.0.0/0`
   - **IP Protocol:** `TCP`
   - **Destination Port Range:** `4000`
6. Click **Add Ingress Rules**.

---

## Step 4: SSH into your Oracle Server

Open PowerShell or Terminal on your local PC and use the private key you downloaded earlier to connect to the server.

```bash
# Navigate to the folder where you saved the key, e.g., Downloads
cd ~/Downloads

# Fix permissions on the key file (Required for Windows PowerShell)
icacls .\ssh-key-202X-XX-XX.key /inheritance:r
icacls .\ssh-key-202X-XX-XX.key /grant:r "$($env:username):(R)"

# Connect to the server (Replace with your actual key file name and Public IP)
ssh -i ssh-key-202X-XX-XX.key ubuntu@YOUR_PUBLIC_IP
```

---

## Step 5: Install Docker and Git on the Server

Once you are logged into the Ubuntu terminal on your Oracle VM, run these commands one by one to install Docker and Git:

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install Git
sudo apt install git -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt-get install docker-compose-plugin -y

# Add your user to the Docker group (so you don't have to use 'sudo' for docker commands)
sudo usermod -aG docker $USER

# Apply the group change (this logs you into a new shell with the updated permissions)
su - $USER
```

---

## Step 6: Clone Your Repository & Configure Environments

1. Clone your project onto the server:
```bash
git clone https://github.com/AbhijeetSoni08/HostelBite.git
cd HostelBite
```

2. Create a `.env` file for Docker Compose to use:
```bash
nano .env
```
3. Paste the following into the `.env` file, replacing the dummy values with your actual secure values:
```env
# Database Credentials
DB_PASSWORD=my_super_secret_db_password
DB_NAME=hostelbite_db

# JWT & Razorpay
JWT_SECRET=my_super_secret_jwt_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```
4. Save and exit the nano editor:
   - Press `Ctrl + O` to save, then `Enter`.
   - Press `Ctrl + X` to exit.

---

## Step 7: Fix Ubuntu's Internal Firewall (Iptables)
Oracle Cloud's Ubuntu images have a strict internal firewall (`iptables`) that overrides the Cloud Security Rules we set in Step 3. Run these commands to open ports 80 and 4000 internally:

```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 4000 -j ACCEPT
sudo netfilter-persistent save
```

---

## Step 8: Build and Run the Docker Containers!

Now, you just need to tell Docker Compose to build everything and start it up in the background (`-d` means detached).

```bash
# Build and run the containers
docker compose up --build -d
```

### What happens now?
- Docker will download MySQL and start the database.
- It will install Node.js, install backend packages, and start your backend on port 4000.
- It will build the React frontend for production and serve it using Nginx on port 80.

### Check if it's working:
You can monitor the logs to ensure the backend connects to the database successfully:
```bash
docker compose logs -f backend
```
*(Press `Ctrl + C` to stop watching the logs)*

---

## Step 9: Access Your Live Application!
Open your web browser and navigate to:
`http://YOUR_PUBLIC_IP`

You should now see the HostelBite frontend. Your frontend will make requests directly to the backend using Docker's internal networking!

---

## Maintenance Commands

**To stop the application:**
```bash
docker compose down
```

**To update the application after pushing new code to GitHub:**
```bash
# Pull new code
git pull origin main

# Rebuild and restart the containers
docker compose up --build -d
```
