void deleteAtHead(node *&head)
{
    temp = head;

    while (temp->next != head)
    {
        temp = temp->next;
    }
    node *todelete = head;

    temp->next = head->next;
    head = head->next;
    delete todelete;
}