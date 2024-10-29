void reverse(node *&head)
{
    if (head == nullptr || head->next == head)
    {
        return; // List is empty or has only one node
    }

    node *prev = nullptr;
    node *curr = head;
    node *next = nullptr;
    node *tail = head;

    // Loop through the list and reverse the links
    do
    {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    } while (curr != head); // Stop when you complete the circle

    // Fix the links of the new head and tail
    head->next = prev; // Last node (original head) now points to the new head
    head = prev;       // Update the head to the new head
}