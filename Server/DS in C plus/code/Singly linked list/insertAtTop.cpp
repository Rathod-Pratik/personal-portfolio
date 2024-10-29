void insertTop(node *&head, int value)
{
    newnode = new node(value);
    temp = head;

    newnode->next = head;
    head = newnode;
}