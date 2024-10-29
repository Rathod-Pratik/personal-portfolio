void display(node *head)
{
    temp = head;
    cout << endl;
    while (temp != nullptr) // Traverse till the end of the list
    {
        cout << temp->data << " -> ";
        temp = temp->next;
    }
    cout << "NULL" << endl;
}