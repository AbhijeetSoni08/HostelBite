import React, { useEffect, useState } from "react";
import axios from "axios";
import { Coffee, Sun, Sunset, Moon, UtensilsCrossed, AlertCircle } from "lucide-react";

const ViewMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [error, setError] = useState("");
  const [activeDay, setActiveDay] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  
  const mealConfig = {
    breakfast: { icon: Coffee, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", time: "08:00 AM - 10:00 AM" },
    lunch: { icon: Sun, color: "text-brand-500", bg: "bg-brand-50", border: "border-brand-200", time: "12:30 PM - 02:00 PM" },
    snacks: { icon: Sunset, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200", time: "04:30 PM - 06:00 PM" },
    dinner: { icon: Moon, color: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-200", time: "07:30 PM - 09:30 PM" }
  };

  useEffect(() => {
    // Set initial active day based on current day of week
    const todayIndex = new Date().getDay(); // 0 is Sunday
    const mappedDay = todayIndex === 0 ? "Sunday" : days[todayIndex - 1];
    setActiveDay(mappedDay);

    const fetchMenu = async () => {
      try {
        const response = await axios.get("/api/menu/getAll");
        setMenuData(response.data);
      } catch (err) {
        setError("Error fetching menu. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const getMealsForDay = (day) => {
    return menuData.filter((m) => m.day === day);
  };

  return (
    <div className="max-w-6xl mx-auto pb-10 font-sans animation-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-brand-100 rounded-xl text-brand-600">
          <UtensilsCrossed size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-dark">Weekly Menu</h1>
          <p className="text-gray-500">Discover what's cooking in the mess this week.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-status-errorBg text-status-error rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Days Tabs (Horizontal Scrollable on mobile) */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-6 custom-scrollbar scroll-smooth snap-x">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`snap-start whitespace-nowrap px-6 py-3 rounded-full font-medium transition-all ${
              activeDay === day 
                ? "bg-dark text-white shadow-md transform scale-105" 
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-dark"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Meals Grid for Active Day */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['breakfast', 'lunch', 'snacks', 'dinner'].map((mealType) => {
            const mealConfigItem = mealConfig[mealType];
            const mealData = getMealsForDay(activeDay).find(m => m.meal_type.toLowerCase() === mealType);
            const Icon = mealConfigItem.icon;

            return (
              <div 
                key={mealType} 
                className={`card p-6 border-l-4 ${mealConfigItem.border} hover:shadow-card-hover transition-all duration-300 relative overflow-hidden`}
              >
                <div className="absolute -right-4 -top-4 opacity-5">
                  <Icon size={120} />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${mealConfigItem.bg} ${mealConfigItem.color}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-dark capitalize">{mealType}</h3>
                  </div>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {mealConfigItem.time}
                  </span>
                </div>
                
                {mealData && mealData.items && mealData.items !== "-" ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mealData.items.split(',').map((item, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-700 font-medium text-sm shadow-sm"
                      >
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500 font-medium">Menu not updated yet</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewMenu;
