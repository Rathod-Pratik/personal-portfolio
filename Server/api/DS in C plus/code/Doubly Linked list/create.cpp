void create(node *&head, int value)
{
    newnode = new node(value);

    if (head == nullptr)
    {
        head = newnode;
    }
    else
    {
        temp = head;
        while (temp->next != nullptr)
        {
            temp = temp->next;
        }

        temp->next = newnode;
        newnode->prev = temp;
    }
}