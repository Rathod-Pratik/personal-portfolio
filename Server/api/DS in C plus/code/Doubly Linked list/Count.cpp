void Count(node *&head)
{
    temp = head;
    int a = 0;
    while (temp != nullptr)
    {
        ++a;
        temp = temp->next;
    }
    cout << "\nThere are " << a << " nodes in the list" << endl;
}