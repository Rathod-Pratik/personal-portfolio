void display(node *head)
{
    if (head == nullptr)
    {
        cout << "List is empty" << endl;
        return;
    }
    temp = head;

    do
    {
        cout << temp->data << " ";
        temp = temp->next;
    } while (temp != head);

    cout << endl;
}