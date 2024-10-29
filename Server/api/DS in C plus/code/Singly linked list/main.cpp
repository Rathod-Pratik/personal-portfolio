int main()
{
    node *head = nullptr; // Head pointer initialized to nullptr (empty list)

    // use to create node
    create(head, 10);
    create(head, 90);
    create(head, 100);

    // insert node at top of the list
    insertTop(head, 5);

    // insert node at end of the list
    insertEnd(head, 35);

    // insert node at specific lacation of the list
    insertAtPos(head, 200, 2);

    // Display all node of the list
    display(head); // Display the list

    // delete the node from the list
     deletion(head, 10);

    // dlelete the fisrt node of the list
    deleteAtHead(head);

    // sort list in assending order
    Sort(head);

    // display(head); // Display the list

    // reverse the list
    head = reverse(head);
    display(head); // Display the list

    // cout the length of the list
    Cout(head);

    // find value in the node
    int node = findNode(head, 100);
    cout << "Value find at the " << node << " location";
    return 0;
}