void updateValue(node *head, int currValue, int newValue)
{
    if (head == nullptr)
    {
        cout << "List is empty!" << endl;
        return;
    }

    curr = head;

    // Loop through the circular linked list
    do
    {
        if (curr->data == currValue)
        {
            curr->data = newValue; // Update node value
            cout << "Node with value " << currValue << " updated to " << newValue << endl;
            return;
        }
        curr = curr->next;
    } while (curr != head); // Loop ends when we come back to the head

    // If the node with the currValue is not found
    cout << "Node with value " << currValue << " not found in the list." << endl;
}