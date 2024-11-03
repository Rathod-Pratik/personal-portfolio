int main()
{
    node *head = nullptr;

    insertAtHead(head, 1);
    insertAtPos(head, 2, 2);
    insertAtTail(head, 3);
    insertAtTail(head, 4);
    insertAtTail(head, 5);

    deleteAtHead(head);

    Search(head, 3);
    display(head);
    updateValue(head, 4, 400);
    deleteAtTail(head);
    reverse(head);
    display(head);
    count(head);
}