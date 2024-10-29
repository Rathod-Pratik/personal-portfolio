bool findNode(node *head, int value)
{
    node *temp = head;
    while (temp != nullptr)
    {
        if (temp->data == value)
        {
            return true; // Value found
        }
        temp = temp->next;
    }
    return false; // Value not found
}