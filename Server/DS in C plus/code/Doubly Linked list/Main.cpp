int main()
{
    node *head = nullptr;
    // Create a node
    create(head, 100);
    create(head, 200);
    create(head, 300);
    create(head, 400);
    create(head, 500);
    create(head, 600);

    // insert at first position
    insertAtFirst(head, 0);

    // insert at given position
    insertAtPos(head, 5, 3);

    // delete a head node
    deleteAtHead(head);

    // delete last node
    deleteAtTail(head);

    //delete node at specific position
    deleteAtPos(head, 4);

    sort(head);

    // display list of nodes
    display(head);
    search(head,500);
    // count the node
    Count(head);
}