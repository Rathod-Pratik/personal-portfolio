void search(node* head, int value) {
    curr = head;
    bool found = false;
    int i=1;

    // Traverse the list to search for the value
    while (curr != nullptr) {
        if (curr->data == value) {
            found = true;  // Value found
            cout <<endl<< "Value found at position :"<<i << endl;
            break;  // Exit the loop once the value is found
        }
        i++;
        curr = curr->next;
    }

    if (!found) {
        cout <<endl<< "Value " << value << " not found in the list." << endl;
    }
}