void Sort(node *&head)
{
    if (!head || !head->next)
        return; // If the list is empty or has only one node, it's already sorted.

    bool swapped;
    node *ptr1;
    node *lptr = nullptr; // This will mark the end of the unsorted portion of the list

    do
    {
        swapped = false;
        ptr1 = head;

        while (ptr1->next != lptr)
        {
            if (ptr1->data > ptr1->next->data)
            {
                // Swap the data
                swap(ptr1->data, ptr1->next->data);
                swapped = true;
            }
            ptr1 = ptr1->next;
        }
        lptr = ptr1; // Reduce the unsorted portion of the list
    } while (swapped);
}