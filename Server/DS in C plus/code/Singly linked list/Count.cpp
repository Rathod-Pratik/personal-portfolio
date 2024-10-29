void Cout(node *&head)
{
    temp = head;
    int a = 1;
    temp = temp->next;
    while (temp->next != nullptr)
    {
        temp = temp->next;
        ++a;
    }
    if (a == 1)
    {
        cout << "There one element in the list" << endl;
    }
    else
    {
        cout << "There are " << a << " element in the list" << endl;
    }
}