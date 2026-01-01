// import { useState, useEffect, useRef } from "react";
// import { Bell } from "lucide-react";
// import { useNotifications } from "../hooks/useNotifications";
// import {
//   markAsRead,
//   markAllAsRead,
// } from "../api/notificationService";
// import { useNavigate } from "react-router-dom";

// function NotificationBell() {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const {
//     notifications,
//     unreadCount,
//     refetch,
//     refetchUnreadCount,
//   } = useNotifications();

//   /* ---------------- Close dropdown on outside click ---------------- */
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   /* ---------------- API helpers ---------------- */
//   const markNotificationAsRead = async (notificationId) => {
//     try {
//       await markAsRead(notificationId);
//       refetch();
//       refetchUnreadCount();
//     } catch (error) {
//       console.error("Failed to mark as read:", error);
//     }
//   };

//   const handleMarkAsRead = (notificationId, e) => {
//     e.stopPropagation();
//     markNotificationAsRead(notificationId);
//   };

//   const handleMarkAllAsRead = async (e) => {
//     e.stopPropagation();
//     try {
//       await markAllAsRead();
//       refetch();
//       refetchUnreadCount();
//     } catch (error) {
//       console.error("Failed to mark all as read:", error);
//     }
//   };

//   /* ---------------- Notification click ---------------- */
//   const handleNotificationClick = (notification) => {
//     if (!notification.is_read) {
//       markNotificationAsRead(notification.id);
//     }

//     setIsOpen(false);

//     // Navigate if notification is linked to something
//     if (notification.related_type && notification.related_id) {
//     //   navigate(`/${notification.related_type}/${notification.related_id}`);
//     }
//   };

//   /* ---------------- Utils ---------------- */
//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diff = now - date;

//     const minutes = Math.floor(diff / 60000);
//     const hours = Math.floor(diff / 3600000);
//     const days = Math.floor(diff / 86400000);

//     if (minutes < 1) return "Just now";
//     if (minutes < 60) return `${minutes}m ago`;
//     if (hours < 24) return `${hours}h ago`;
//     if (days < 7) return `${days}d ago`;

//     return date.toLocaleDateString();
//   };

//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case "purchase":
//         return "💰";
//       case "upload_approval":
//         return "✅";
//       case "upload_rejected":
//         return "❌";
//       case "dataset_update":
//         return "📊";
//       case "message":
//         return "💬";
//       case "job_update":
//         return "📝";
//       default:
//         return "🔔";
//     }
//   };

//   /* ---------------- Render ---------------- */
//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Bell Button */}
//       <button
//         onClick={() => setIsOpen((prev) => !prev)}
//         className="relative p-2 text-gray-700 hover:text-primary transition-colors"
//       >
//         <Bell className="w-6 h-6" />
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//             {unreadCount > 9 ? "9+" : unreadCount}
//           </span>
//         )}
//       </button>

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[420px] overflow-hidden flex flex-col">
//           {/* Header */}
//           <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//             <h3 className="font-bold border border-gray-300 p-3 rounded text-lg">Notifications</h3>
//             {unreadCount > 0 && (
//               <button
//                 onClick={handleMarkAllAsRead}
//                 className="text-sm text-primary hover:underline"
//               >
//                 Mark all as read
//               </button>
//             )}
//           </div>

//           {/* Notifications List */}
//           <div className="overflow-y-auto flex-1">
//             {notifications.length === 0 ? (
//               <div className="p-8 text-center text-gray-500">
//                 <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                 <p>No notifications</p>
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-100">
//                 {notifications.slice(0, 10).map((notification) => (
//                   <div
//                     key={notification.id}
//                     onClick={() => handleNotificationClick(notification)}
//                     className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
//                       !notification.is_read
//                         ? "bg-blue-50 border-l-4 border-primary"
//                         : ""
//                     }`}
//                   >
//                     <div className="flex items-start gap-3">
//                       <span className="text-2xl">
//                         {getNotificationIcon(notification.type)}
//                       </span>

//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between">
//                           <h4 className="font-semibold text-sm">
//                             {notification.title}
//                           </h4>
//                           {!notification.is_read && (
//                             <span className="w-2 h-2 bg-primary rounded-full mt-1 ml-2" />
//                           )}
//                         </div>

//                         <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//                           {notification.message}
//                         </p>

//                         <p className="text-xs text-gray-400 mt-2">
//                           {formatTime(notification.created_at)}
//                         </p>
//                       </div>

//                       {!notification.is_read && (
//                         <button
//                           onClick={(e) =>
//                             handleMarkAsRead(notification.id, e)
//                           }
//                           className="text-xs text-primary hover:underline"
//                         >
//                           Mark read
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           {notifications.length > 10 && (
//             <div className="p-3 border-t border-gray-200 text-center">
//               <button
//                 onClick={() => {
//                   setIsOpen(false);
//                   navigate("/notifications");
//                 }}
//                 className="text-md text-black cursor-pointer hover:underline"
//               >
//                 View all notifications
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default NotificationBell;
