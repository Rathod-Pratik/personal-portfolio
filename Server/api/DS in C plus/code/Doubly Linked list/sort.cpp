void sort(node *head) {
    if (!head) 
        return;

    bool swapped;
    node *curr;
    node *lastsorted = nullptr;

    do {
        swapped = false;
        curr = head;

        while (curr->next != lastsorted) {  // Ensure we stop before last sorted element
            if (curr->data > curr->next->data) {
                swap(curr, curr->next);
                swapped = true;
            }
            curr = curr->next;
        }
        lastsorted = curr;  // Set lastsorted to the last node in this pass
    } while (swapped);
}