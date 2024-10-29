void insertAtPos(node *&head, int value, int pos)
{
    newnode = new node(value);
    temp = head;
    for (int i = 1; i < pos - 1 && temp != nullptr; i++)
    {
        temp = temp->next;
    }

    if (temp != nullptr)
    {
        newnode->next = temp->next;
        temp->next = newnode;
    }
}