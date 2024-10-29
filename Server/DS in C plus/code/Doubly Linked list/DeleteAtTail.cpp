void deleteAtTail(node *&head)
{
    temp = head;
    if (head == nullptr)
    {
        cout << "List is empty " << endl;
        return;
    }
    else
    {

        if (head->next == nullptr)
        {
            delete head;
            head = nullptr;
            return;
        }
        else
        {
            while (temp->next != nullptr)
            {
                temp = temp->next;
            }
            temp->prev->next = nullptr;
            delete temp;
        }
    }
}