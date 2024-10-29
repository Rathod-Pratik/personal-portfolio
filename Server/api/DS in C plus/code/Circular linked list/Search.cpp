void Search(node *head, int value)
{
    if (head == nullptr)
    {
        cout << "List is empty!" << endl;
        return;
    }

    curr = head;
    int position = 1; // Start with position 1

    // Loop through the circular linked list
    do
    {
        if (curr->data == value)
        {
            cout << "Value " << value << " found at node " << position << endl;
            return;
        }
        curr = curr->next;
        position++;
    } while (curr != head); // Loop ends when we come back to the head

    // If the value is not found
    cout << "Value " << value << " not found in the list." << endl;
}