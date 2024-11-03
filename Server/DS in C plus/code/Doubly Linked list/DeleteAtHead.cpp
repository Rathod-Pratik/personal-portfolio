void deleteAtHead(node *&head)
{
    temp = head;
    if (head == nullptr)
    {
        cout << "The list is empty " << endl;
        return;
    }
    else
    {
        if (head->next == nullptr)
        {
            delete head;
            return;
        }
        else
        {
            head = head->next;
            head->prev = nullptr;
            delete temp;
        }
    }
}