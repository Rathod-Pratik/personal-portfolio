void display(node *&head)
{
    temp = head;
    while (temp != nullptr)
    {
        cout << temp->data;
        if (temp->next != nullptr)
        {
            cout << "->";
        }
        temp = temp->next;
    }
}
