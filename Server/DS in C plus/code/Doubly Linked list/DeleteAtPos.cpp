node *deleteAtPos(node *&head, int pos)
{

    if (head == nullptr || pos < 1)
    {
        return head;
    }

    int i;
    temp = head;
    if (head == nullptr)
    {
        return head;
    }

    for (i = 1; temp != nullptr && i < pos; ++i)
    {
        temp = temp->next;
    }
    if (temp->prev != nullptr)
    {
        temp->prev->next = temp->next;
    }
    else
    {
        head = temp->next;
    }
    if (temp->next != nullptr)
    {
        temp->next->prev = temp->prev;
    }
    delete temp;
    return head;
}