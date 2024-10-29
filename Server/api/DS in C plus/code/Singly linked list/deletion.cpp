void deletion(node *&head, int value)
{
    node *temp = head;

    if (head == nullptr)
    { // If the list is empty
        return;
    }

    // Check if the value to be deleted is at the head
    if (head->data == value)
    {
        deleteAtHead(head);
        return;
    }

    // Check if there is only one element in the list
    if (head->next == nullptr)
    {
        deleteAtHead(head);
        return;
    }

    // Traverse to find the node before the target node
    while (temp->next->data != value)
    {
        temp = temp->next;
    }

    if (temp->next == nullptr)
    { // If the value is not found
        return;
    }

    node *todelete = temp->next;
    temp->next = temp->next->next;

    delete todelete;
}