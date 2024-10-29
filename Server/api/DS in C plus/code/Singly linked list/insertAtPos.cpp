void insertAtPos(node *&head, int value, int pos)
{
    node *newNode = new node(value); // Create a new node
    node *temp = head;

    for (int i = 1; i < pos - 1 && temp != nullptr; i++)
    {
        temp = temp->next; // Traverse to the position
    }

    if (temp != nullptr)
    {
        newNode->next = temp->next; // Insert the node
        temp->next = newNode;
    }
}