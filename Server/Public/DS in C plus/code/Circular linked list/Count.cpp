int count(node *head)
{
    if (head == nullptr)
    {
        return 0; // If the list is empty, return 0
    }

    curr = head;
    int count = 0;

    // Loop through the circular linked list
    do
    {
        count++; // Increment the counter for each node
        curr = curr->next;
    } while (curr != head); // Stop when we get back to the head

    cout << "There are " << count << " nodes in the list " << endl; // Return the total number of nodes
}