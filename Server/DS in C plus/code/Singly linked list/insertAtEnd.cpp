void insertEnd(node *&head, int value)
{
    newnode = new node(value);
    temp = head;

    temp = temp->next;
    while (temp->next != nullptr)
    {
        temp = temp->next;
    }
    temp->next = newnode;
}