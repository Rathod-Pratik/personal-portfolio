const express = require("express");
const { sendCode } = require("./PrintData");
const app = express.Router();

app.get("/", (req, res) => {
  const data = [
    {
      _id: 1,
      code: sendCode("DS in C plus/code/36.Array.cpp"),

      explanation:
        "Arrays in C++ are a collection of elements of the same data type stored in contiguous memory locations. They provide a convenient way to group related data and access it using an index. Arrays can hold multiple values, which can be accessed and manipulated efficiently through their indices. They are widely used for various purposes, such as managing collections of data and implementing data structures.",
      topics: [
        "Declaration and Initialization: Arrays in C++ are declared by specifying the data type followed by the array name and its size. They can be initialized at the time of declaration or later in the code. For example, int arr[5]; declares an array of five integers.",
        "Accessing Elements: Elements in an array are accessed using their indices, starting from 0. For instance, arr[0] accesses the first element, while arr[4] accesses the fifth element. This indexing allows for efficient data retrieval and modification.",
        "Multidimensional Arrays: C++ supports multidimensional arrays, which are essentially arrays of arrays. They allow the storage of data in a tabular form, enabling the creation of matrices and higher-dimensional data structures. For example, int matrix[3][4]; defines a 2D array with 3 rows and 4 columns.",
        "Array Size: The size of an array must be specified at the time of declaration and cannot be changed dynamically. However, the size can be determined using the sizeof operator, which helps in iterating over the array elements efficiently.",
        "Limitations: While arrays provide a simple way to store collections of data, they have some limitations, such as fixed size, lack of built-in bounds checking, and the need for contiguous memory allocation. These limitations can lead to issues such as buffer overflow if not managed carefully.",
      ],
    },
    {
      _id: 2,
      code: sendCode("DS in C plus/code/37.Singly Linked list.cpp"),

      explanation:
        "A singly linked list is a dynamic data structure consisting of a sequence of nodes, where each node contains data and a pointer to the next node in the sequence. This structure allows for efficient insertion and deletion of elements, as nodes can be added or removed without reorganizing the entire list. Singly linked lists are useful for implementing other data structures, managing dynamic collections of data, and supporting operations that require sequential access.",
      topics: [
        "Node Structure: Each node in a singly linked list contains two components: the data it holds and a pointer (or reference) to the next node in the list. This simple structure enables traversal through the list, starting from the head node.",
        "Head and Tail: The head of the linked list is the first node, providing the entry point for accessing the list. The tail is the last node, which points to NULL (or nullptr in C++) to indicate the end of the list. This structure allows traversal from the head to the tail.",
        "Insertion Operations: Nodes can be inserted at various positions in a singly linked list, including at the beginning, at the end, or at a specific position. Insertion involves adjusting pointers of the relevant nodes, making it a flexible option for dynamic data management.",
        "Deletion Operations: Deleting nodes from a singly linked list requires adjusting the pointers of the surrounding nodes to bypass the node being removed. This can be done for the head, tail, or any node in between, making it efficient for managing data collections.",
        "Traversal: Traversing a singly linked list involves starting from the head and following the pointers to each subsequent node until reaching the end of the list. This operation is essential for accessing and processing the data contained within the list.",
      ],
    },
    {
      _id: 3,
      code: sendCode("DS in C plus/code/38.Doubly Linked list.cpp"),
      explanation:
        "A doubly linked list is a complex data structure consisting of a sequence of nodes, where each node contains three components: a pointer to the previous node, the data it holds, and a pointer to the next node. This structure allows for bidirectional traversal, enabling efficient insertion and deletion of nodes from both ends and any point in between. Doubly linked lists provide greater flexibility compared to singly linked lists, making them suitable for various applications where dynamic data management is required.",
      topics: [
        "Node Structure: Each node in a doubly linked list has three parts: a pointer to the previous node, the data it contains, and a pointer to the next node. This allows traversal in both directions, enhancing access to the list's elements.",
        "Head and Tail: Similar to singly linked lists, the head points to the first node, while the tail points to the last node. However, each node's previous pointer enables backward traversal, making operations like deletion and insertion more versatile.",
        "Insertion Operations: Nodes can be inserted at the beginning, end, or in the middle of the list. Insertion requires updating the pointers of the affected nodes, allowing efficient management of the list structure.",
        "Deletion Operations: Deleting a node from a doubly linked list involves updating the pointers of both the previous and next nodes to bypass the node being removed. This capability simplifies the deletion process, especially when dealing with edge cases like removing the head or tail.",
        "Traversal: Traversing a doubly linked list can be done in both forward and backward directions. This bidirectional capability allows for more flexible algorithms and operations, making it easier to access elements from either end of the list.",
      ],
    },
    {
      _id: 4,
      code: sendCode("DS in C plus/code/39.Circular linked list.cpp"),
      explanation:
        "A circular linked list is a variation of the linked list where the last node points back to the first node, forming a closed loop. This structure allows continuous traversal of the list from any starting point without encountering a null reference. Circular linked lists are useful for applications requiring cyclic data processing, such as round-robin scheduling, where the list can be traversed in a loop indefinitely.",
      topics: [
        "Node Structure: Similar to other linked lists, each node in a circular linked list contains data and a pointer to the next node. However, in a circular linked list, the last node’s pointer points back to the first node, creating a circular structure.",
        "Head Node: The head node serves as the starting point for traversal. In a circular linked list, since the last node points back to the head, it is possible to continue traversing from the head indefinitely without reaching a null reference.",
        "Types: Circular linked lists can be either singly or doubly linked. In a circular singly linked list, nodes only have a pointer to the next node. In a circular doubly linked list, each node has pointers to both the next and previous nodes, allowing bidirectional traversal.",
        "Insertion Operations: Nodes can be inserted at the beginning, end, or in between nodes. Insertion requires adjusting pointers so that the circular structure is maintained, ensuring the last node always points back to the head.",
        "Traversal: Traversal in a circular linked list can begin from any node and continue in a loop until a desired stopping point. Since there is no null reference, specific conditions must be set to terminate the traversal, often returning to the starting node.",
      ],
    },
    {
      _id: 5,
      code: sendCode("DS in C plus/code/40.stack.cpp"),
      explanation:
        "A stack is a linear data structure that follows the Last In, First Out (LIFO) principle, where the last element added is the first one to be removed. It is commonly used for managing tasks, such as function calls, undo operations, and backtracking. Stacks allow for two main operations: pushing an element onto the stack and popping an element off the stack. Due to its LIFO nature, a stack provides efficient access to the most recently added elements.",
      topics: [
        "Push Operation: The push operation adds an element to the top of the stack. This is a constant-time operation (O(1)), making it efficient for managing elements in a controlled, sequential order.",
        "Pop Operation: The pop operation removes the element from the top of the stack. Like the push operation, popping is a constant-time operation. If the stack is empty, a pop operation typically triggers an error or returns a special value.",
        "Peek Operation: The peek (or top) operation retrieves the top element of the stack without removing it. This allows you to check the most recent element added without modifying the stack's contents.",
        "Underflow and Overflow: Stack underflow occurs when attempting to pop an element from an empty stack, while overflow happens when trying to push an element onto a stack that has reached its maximum capacity. Proper error handling is crucial to avoid these issues.",
        "Applications: Stacks are widely used in various applications, such as expression evaluation, parsing, backtracking algorithms, and managing function calls in programming languages. They provide a simple yet powerful structure for managing tasks that follow the LIFO order.",
      ],
    },
    {
      _id: 6,
      code: sendCode("DS in C plus/code/41.Queue.cpp"),
      explanation:
        "A queue is a linear data structure that follows the First In, First Out (FIFO) principle, where the first element added is the first one to be removed. It operates like a real-world queue, such as a line at a checkout counter, where elements are processed in the order they arrive. Queues are widely used for scheduling tasks, managing resources, and buffering data streams, as they provide an organized way to handle sequential processing.",
      topics: [
        "Enqueue Operation: The enqueue operation adds an element to the end (rear) of the queue. This operation maintains the FIFO order, allowing new elements to join the queue in sequence.",
        "Dequeue Operation: The dequeue operation removes an element from the front of the queue. As elements are always removed from the front, this operation ensures that the oldest elements are processed first.",
        "Front and Rear: The front refers to the first element in the queue, which is the next to be removed, while the rear is the last element, which is where new elements are added. These pointers help manage the queue's current state.",
        "Types of Queues: Variants of the queue structure include circular queues, which loop back to the beginning when they reach the end, and priority queues, where elements are dequeued based on priority rather than arrival order.",
        "Applications: Queues are essential in areas like task scheduling, managing print jobs, processing requests in web servers, and handling data in breadth-first search algorithms. Their FIFO nature makes them suitable for scenarios requiring ordered processing.",
      ],
    },
    {
      _id: 7,
      code: sendCode("DS in C plus/code/42.Hash table.cpp"),
      explanation:
        "A hash table is a data structure that stores key-value pairs and provides fast data retrieval based on keys. By using a hash function, keys are mapped to specific indices (or slots) in an underlying array, allowing for efficient access, insertion, and deletion operations. Hash tables are widely used in applications requiring quick lookups, such as databases, caching, and dictionaries, due to their average-case constant time complexity for these operations.",
      topics: [
        "Hash Function: A hash function takes a key and converts it into an index in the array. The quality of the hash function affects the efficiency of the hash table, as it should minimize collisions and distribute keys uniformly across the array.",
        "Collisions: Collisions occur when multiple keys hash to the same index. Hash tables handle collisions using methods like chaining (linking collided keys together in a list) or open addressing (finding another slot for the collided key).",
        "Load Factor: The load factor is the ratio of the number of elements to the size of the hash table. A high load factor can lead to more collisions, so resizing the table and rehashing the elements is often done when the load factor exceeds a certain threshold.",
        "Resizing: Hash tables dynamically resize to maintain performance. When the table reaches a specific load factor, it can be resized (usually doubled in size) to reduce collisions. During resizing, all keys are rehashed into the new table.",
        "Applications: Hash tables are used in various applications, including caching, indexing, implementing associative arrays or dictionaries, and in algorithms that require fast lookups, such as data deduplication and symbol tables in compilers.",
      ],
    },
  ];
  res.status(200).json(data);
});

module.exports = app;
