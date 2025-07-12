// LocationSearchPanel.jsx
import React from "react";
import { TiLocation } from "react-icons/ti";

const LocationSearchPanel = ({
  suggestions,
  setPanelOpen, // Keep this prop for closing the panel
  setVehiclePanelOpen, // New prop to control the vehicle panel
  setPickUp,
  setDestination,
  activeField,
  setActiveField, // New prop to set active field in Home.jsx
}) => {
  const handleSuggestionClick = (suggestion) => {
    const suggestionText = typeof suggestion === 'string'
      ? suggestion
      : suggestion.description || suggestion.name || suggestion.formatted_address || '';

    if (activeField === 'pickup') {
      setPickUp(suggestionText);
      setActiveField('destination'); // Move to destination field
      // Don't close panel yet, allow user to enter destination
    } else if (activeField === 'destination') {
      setDestination(suggestionText);
      setPanelOpen(false); // Close the location search panel
      setVehiclePanelOpen(true); // Open the vehicle selection panel
    }
  };

  console.log('LocationSearchPanel suggestions:', suggestions);
  console.log('Active field:', activeField);

  return (
    <div className="px-3 py-2">
      <h3 className="text-lg font-semibold mb-3">
        {activeField === 'pickup' ? 'Pickup locations' : 'Destination suggestions'}
      </h3>

      {suggestions && suggestions.length > 0 ? (
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {suggestions.map((elem, idx) => {
            const displayText = typeof elem === 'string'
              ? elem
              : elem.description || elem.name || elem.formatted_address || 'Unknown location';

            return (
              <div
                key={idx}
                onClick={() => handleSuggestionClick(elem)}
                className="flex gap-3 items-center p-2 justify-start cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
              >
                <TiLocation className="bg-[#eee] h-8 w-8 p-1.5 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900">{displayText}</h4>
                  {elem.secondary_text && (
                    <p className="text-xs text-gray-500">{elem.secondary_text}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-gray-400 text-center py-4 text-sm">
          {activeField ? `Start typing to search for ${activeField} locations` : 'No suggestions available'}
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;