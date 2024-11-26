void create(node *&head, int value)
{
    newnode = new node(value);

    if (head == nullptr) // If the list is empty
    {
        head = temp = newnode;
    }
    else
    {
        temp->next = newnode; // Link the new node
        temp = newnode;       // Move temp to the new node
    }
}