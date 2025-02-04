import { useState, useCallback } from "react"
/**
 * Renders an array of strings passed in that can be filtered and added to as an
 * unordered list.
 * @returns Component
 */
export default function Sidebar({ initialMenuItems }) {
  // Holds the current text value
  // We use setNewMenuItem to update this value
  let [newMenuItem, setNewMenuItem] = useState("");
  // Holds the current list of menu items
  let [menuItems, setMenuItems] = useState(initialMenuItems);
  // Filters the list of menu items
  let [filter, setFilter] = useState("");
  // Function to add a new menu item
  let addMenuItem = useCallback(() => {
    // Prevents adding empty items
    if (newMenuItem.trim() === "") return;
    // Add new item to the list
    setMenuItems([newMenuItem, ...menuItems]);
    // Clear input
    setNewMenuItem(""); 
  }, [newMenuItem, menuItems]);
  
  return (
    <div>
      {/* Input to add new menu items */}
      <input
        type="text"
        id="newMenuItemValue"
        value={newMenuItem}
        onChange={(event) => setNewMenuItem(event.target.value)}
      />
      <br />
      <button onClick={addMenuItem}>Add Item</button>
      <br />

      {/* Input to filter menu items */}
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Filter by..."
      />
      <br />

      {/* Render filtered menu items */}
      <ul>
        {menuItems
          .filter(item => new RegExp(filter, "i").test(item)) // Case-insensitive filtering
          .map((item, index) => (
            <li key={index}>{item}</li>
          ))}
      </ul>
    </div>
  );
}
