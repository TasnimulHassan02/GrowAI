import React from "react";
import VerifiedIcon from '../../../asset/VerifiedIcon.png';

const CardGrid = ({ labelers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
      {labelers.map((person) => (
        <div
          key={person.id}
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition duration-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src={person.profile_image}
              alt={person.full_name}
              className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                {person.full_name}
                {person.is_verified && (
                  <img src={VerifiedIcon} alt="Verified" className="w-5 h-5" />
                )}
              </h3>
            </div>
          </div>

          <p className="text-gray-700 mb-2">{person.expertise}</p>

          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-900">
              US${person.hourly_rate}
            </span>
            <span className="flex items-center gap-1 text-yellow-500 font-medium">
              ★ {person.rating} ({person.review_count})
            </span>
          </div>

          <button
            className={`w-full py-2 rounded-xl font-semibold transition ${
              person.is_verified
                ? "bg-primary hover:bg-green-400 text-black"
                : "bg-gray-300 cursor-not-allowed text-gray-600"
            }`}
            disabled={!person.is_verified}
          >
            {person.is_verified ? "Request" : "Unavailable"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;