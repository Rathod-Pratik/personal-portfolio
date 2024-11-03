void insertAtPos(node *&head, int pos, int value)
{
    // If the list is empty
    if (head == nullptr)
    {
        if (pos != 1)
        {
            cout << "Invalid position!" << endl;
            return;
        }
        // Create a new node and make it point to itself (circular list)
        newnode = new node(value);
        head = newnode;
        head->next = head;
        return;
    }

    // Create a new node with the given data
    newnode = new node(value);

    // If inserting at position 1 (the head of the list)
    if (pos == 1)
    {
        curr = head;

        // Traverse to the last node
        while (curr->next != head)
        {
            curr = curr->next;
        }

        // Insert new node at the beginning
        newnode->next = head;
        curr->next = newnode;
        head = newnode; // Update head to the new node
        return;
    }

    // For other positions, traverse the list to find the correct spot
    curr = head;
    int count = 1;

    // Traverse the list to the position just before the desired position
    while (count < pos - 1 && curr->next != head)
    {
        curr = curr->next;
        count++;
    }

    // If we reached the position
    if (count == pos - 1)
    {
        newnode->next = curr->next;
        curr->next = newnode;
    }
    else
    {
        // Position is out of bounds
        cout << "Invalid position!" << endl;
    }

    return;
}