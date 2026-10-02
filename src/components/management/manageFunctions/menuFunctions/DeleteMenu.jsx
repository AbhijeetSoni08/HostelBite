import React, { useState } from "react";
import axios from "axios";
import { useToast } from "../../../common/ToastContext";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";

const DeleteMenu = () => {
    const { addToast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("WARNING: This will permanently delete the entire menu. Proceed?")) {
            return;
        }

        setIsDeleting(true);
        try {
            const res = await axios.delete("/api/menu/delete");
            addToast("success", res.data.message || "Menu deleted successfully!");
        } catch (error) {
            console.error("Error deleting menu:", error);
            if (error.response && error.response.status === 404) {
                addToast("info", "Menu is already empty.");
            } else {
                addToast("error", "Error deleting menu. Please try again.");
            }
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto pb-10 font-sans animation-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">Clear Menu Database</h1>
                <p className="text-gray-500">Permanently delete all scheduled meals across all days.</p>
            </div>

            <div className="card p-8 border-2 border-rose-100 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle size={40} className="animate-pulse" />
                </div>
                
                <h2 className="text-2xl font-bold text-dark mb-3">Danger Zone</h2>
                <p className="text-gray-600 mb-8 max-w-sm">
                    This action will wipe the entire weekly menu database. Students and staff will no longer be able to see upcoming meals. This cannot be undone.
                </p>

                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="btn btn-danger w-full sm:w-auto px-10 py-3 flex items-center justify-center gap-2 text-lg"
                >
                    {isDeleting ? (
                        <>
                            <Loader2 size={20} className="animate-spin" /> Deleting...
                        </>
                    ) : (
                        <>
                            <Trash2 size={20} /> Delete Entire Menu
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default DeleteMenu;
