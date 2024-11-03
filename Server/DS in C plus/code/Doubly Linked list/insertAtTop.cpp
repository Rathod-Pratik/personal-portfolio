void insertAtFirst(node *&head, int value)
{
    newnode = new node(value);
    if (head == nullptr)
    {
        head = newnode;
    }
    else
    {
        newnode->next = head;
        head->prev = newnode;
        head = newnode;
    }
}