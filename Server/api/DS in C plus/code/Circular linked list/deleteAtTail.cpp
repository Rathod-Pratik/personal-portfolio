void deleteAtTail(node *&head)
{
    if (head == nullptr)
    {
        // If the list is empty
        cout << "List is empty, nothing to delete." << endl;
        return;
    }

    temp = head; // Temporary pointer to traverse the list

    // If there's only one node in the list
    if (head->next == head)
    {
        delete head;    // Delete the single node
        head = nullptr; // Set head to nullptr since the list is now empty
        return;
    }

    // Traverse the list to find the second last node
    curr = head;
    while (curr->next->next != head)
    { // Stop at the second last node
        curr = curr->next;
    }

    // Delete the last node (curr->next)
    node *lastNode = curr->next;
    curr->next = head; // Update the second last node to point to head
    delete lastNode;   // Update head to the new last node
}