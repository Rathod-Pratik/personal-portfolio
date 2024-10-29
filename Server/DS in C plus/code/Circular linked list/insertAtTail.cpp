void insertAtTail(node *&head, int value)
{
    if (head == nullptr)
    {
        insertAtHead(head, value);
        return;
    }
    newnode = new node(value);
    temp = head;

    while (temp->next != head)
    {
        temp = temp->next;
    }
    temp->next = newnode;
    newnode->next = head;
}
