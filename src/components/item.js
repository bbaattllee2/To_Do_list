
function RemoveItem() {
    
}

export default function Item({item_name, item_due_date}) {
    return (
        <div>
            <h2>{item_name}</h2>
            <h4>Due date: {item_due_date}</h4>
            <button type="button" onClick={}>Mark Task As Complete</button>
        </div>
    )
}