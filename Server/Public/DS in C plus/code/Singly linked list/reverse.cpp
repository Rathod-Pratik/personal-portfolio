node *reverse(node *&head)
{
    if (head == nullptr || head->next == nullptr)
    {
        return head;
    }

    newnode = reverse(head->next);
    head->next->next = head;
    head->next = nullptr;
    return newnode;
}