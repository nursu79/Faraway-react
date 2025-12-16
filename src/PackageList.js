import { useState } from "react";
export default function PackingList({
  items,
  onDeleteItem,
  onToggleItems,
  onClearlist,
}) {
  const [sortBY, setSortBy] = useState("input");

  let sortedItems;
  if (sortBY === "input") sortedItems = items;
  if (sortBY === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBY === "packed")
    // eslint-disable-next-line no-unused-vars
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          ></Item>
        ))}
      </ul>{" "}
      <div className="actions">
        <select value={sortBY} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order...</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearlist}> Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description};
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
