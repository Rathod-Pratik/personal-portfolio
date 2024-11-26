void insertAtHead(node *&head, int value)
{
    newnode = new node(value);

    if (head == nullptr)
    {
        newnode->next = newnode;
        head = newnode;
        return;
    }
    temp = head;

    while (temp->next != head)
    {
        temp = temp->next;
    }
    newnode->next = head;
    temp->next = newnode;
    head = newnode;
}
