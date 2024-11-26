const express = require("express");
const fs = require("fs").promises;
const app = express.Router();

app.get("/", async (req, res) => {
  async function sendCode(filePaths) {
    try {
      if (!Array.isArray(filePaths)) {
        filePaths = [{ function_code: filePaths, function_name: "Main function" }];
      }
      
      return Promise.all(
        filePaths.map(async (file) => {
          try {
            const data = await fs.readFile(file.function_code, "utf8");
            return { function_name: file.function_name, function_code: data };
          } catch (error) {
            console.error(`Error reading file ${file.function_code}:`, error);
            return { function_name: file.function_name, function_code: null };
          }
        })
      );
    } catch (error) {
      console.error("Error reading files:", error);
      throw new Error("Failed to read files");
    }
  }
  /*give id to user to access perticular object use sendphoto and send code function to send photo and code*/
  try{
  const files = [
    {
      _id: 1,
      code: "Public/DS in C plus/code/36.Array.cpp",
      file_name: "Array",
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
      file_name:"Singly Linked list",
      code: [
        {
          function_code: "Public/DS in C plus/code/Singly linked list/structure.cpp",
          function_name: "Structure",
        },
        {
          function_code: "Public/DS in C plus/code/Singly linked list/create.cpp",
          function_name: "Create",
        },
        {
          function_code:
            "Public/DS in C plus/code/Singly linked list/insertAtTop.cpp"
          ,
          function_name: "insertAtTop",
        },
        {
          function_code:
            "Public/DS in C plus/code/Singly linked list/insertAtPos.cpp"
          ,
          function_name: "insertAtPos",
        },
        {
          function_code:
            "Public/DS in C plus/code/Singly linked list/insertAtEnd.cpp"
          ,
          function_name: "insertAtEnd",
        },
        {
          function_code:
            "Public/DS in C plus/code/Singly linked list/deleteAtHead.cpp"
          ,
          function_name: "deleteAtHead",
        },
        {
          function_code: "Public/DS in C plus/code/Singly linked list/deletion.cpp",
          function_name: "Deletion",
        },
        {
          function_code: "Public/DS in C plus/code/Singly linked list/reverse.cpp",
          function_name: "Reverse",
        },
        {
          function_code: "Public/DS in C plus/code/Singly linked list/sort.cpp",
          function_name: "Sort",
        },
        {
          function_code: "Public/DS in C plus/code/Singly linked list/FindNode.cpp",
          function_name: "FindNode",
        },
        {
          function_code: "Public/DS in C plus/code/Singly linked list/display.cpp",
          function_name: "display",
        },
        {
          function_code: "Public/DS in C plus/code/Singly linked list/Count.cpp",
          function_name: "Count",
        },
        {
          function_code: "Public/DS in C plus/code/Singly linked list/main.cpp",
          function_name: "Main function",
        },
      ],
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
      code: [
        { function_code: "Public/DS in C plus/code/Doubly Linked list/structure.cpp", function_name: "Structure" },
        { function_code: "Public/DS in C plus/code/Doubly Linked list/create.cpp", function_name: "Create" },
        { function_code: "Public/DS in C plus/code/Doubly Linked list/insertAtTop.cpp", function_name: "insertAtTop" },
        { function_code: "Public/DS in C plus/code/Doubly Linked list/insertAtPos.cpp", function_name: "insertAtPos" },
        { function_code: "Public/DS in C plus/code/Doubly Linked list/DeleteAtHead.cpp", function_name: "DeleteAtHead" },
        { function_code: "Public/DS in C plus/code/Doubly Linked list/DeleteAtPos.cpp", function_name: "DeleteAtPos" },
        { function_code: "Public/DS in C plus/code/Doubly Linked list/DeleteAtTail.cpp", function_name: "DeleteAtTail" },
        { function_code: "Public/DS in C plus/code/Doubly Linked list/Display.cpp", function_name: "display" },
        { function_code: "Public/DS in C plus/code/Doubly Linked list/Count.cpp", function_name: "Count" },
        { function_code: "Public/DS in C plus/code/Doubly Linked list/Search.cpp", function_name: "Search" },
        { function_code: "Public/DS in C plus/code/Doubly Linked list/sort.cpp", function_name: "sort" },
        { function_code: "Public/DS in C plus/code/Doubly Linked list/Swap.cpp", function_name: "Swap" },
        { function_code: "Public/DS in C plus/code/Doubly Linked list/Main.cpp", function_name: "Main Function" },
      ],
      file_name: "Doubly Linked list",
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
      file_name: "Circular linked list",
      code: [
        { function_code: "Public/DS in C plus/code/Circular linked list/structure.cpp", function_name: "Structure" },
        { function_code: "Public/DS in C plus/code/Circular linked list/insertAtHead.cpp", function_name: "insertAtHead" },
        { function_code: "Public/DS in C plus/code/Circular linked list/insertAtPos.cpp", function_name: "insertAtPos" },
        { function_code: "Public/DS in C plus/code/Circular linked list/insertAtTail.cpp", function_name: "insertAtTail" },
        { function_code: "Public/DS in C plus/code/Circular linked list/deleteAtHead.cpp", function_name: "deleteAtHead" },
        { function_code: "Public/DS in C plus/code/Circular linked list/Display.cpp", function_name: "display" },
        { function_code: "Public/DS in C plus/code/Circular linked list/Count.cpp", function_name: "Count" },
        { function_code: "Public/DS in C plus/code/Circular linked list/reverse.cpp", function_name: "reverse" },
        { function_code: "Public/DS in C plus/code/Circular linked list/Search.cpp", function_name: "Search" },
        { function_code: "Public/DS in C plus/code/Circular linked list/UpdateValue.cpp", function_name: "UpdateValue" },
        { function_code: "Public/DS in C plus/code/Circular linked list/main.cpp", function_name: "Main function" },
    
      ],
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
      file_name: "stack",
      code: "Public/DS in C plus/code/40.stack.cpp",
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
      code: "Public/DS in C plus/code/41.Queue.cpp",
      file_name: "Queue",
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
      file_name: "Hash table",
      code: "Public/DS in C plus/code/42.Hash table.cpp",
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
    {
      _id: 8,
      file_name: "Bubble sort",
      code: "Public/DS in C plus/code/43.Bubble sort.cpp",
      explanation:
        "Bubble Sort is a straightforward sorting algorithm that repeatedly steps through a list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until no more swaps are needed, which means the list is sorted. Though simple to implement, bubble sort has a relatively high time complexity and is usually less efficient than other sorting algorithms for large datasets. It is best used for educational purposes or very small datasets due to its average and worst-case time complexity of O(n²).",
        topics: [
          "Passes: Bubble Sort performs multiple passes through the list. In each pass, adjacent elements are compared, and if they are out of order, they are swapped. This pushes the largest unsorted element to its correct position at the end of the list by the end of each pass.",
          "Swaps: The core operation in bubble sort is the swap. If two adjacent elements are in the wrong order, they are swapped to move larger elements towards the end of the list and smaller elements towards the beginning.",
          "Optimization with Early Exit: A flag can be used to track whether any swaps are made during a pass. If no swaps are made, the list is already sorted, and the algorithm can terminate early, improving performance in some cases.",
          "Time Complexity: Bubble Sort has a worst-case and average time complexity of O(n²) because it requires multiple passes and comparisons in a nested loop structure. This makes it less efficient than other sorting algorithms like Quick Sort or Merge Sort for large lists.",
          "Applications: Due to its simplicity, Bubble Sort is often used for teaching basic sorting principles. However, it is not commonly used in production code as there are more efficient sorting algorithms for handling larger datasets."
        ],
    },
    {
      _id: 9,
      file_name: "Insertion sort",
      code: "Public/DS in C plus/code/44.Insertion sort.cpp",
      explanation: "Insertion Sort is a simple sorting algorithm that builds the sorted array one item at a time by repeatedly inserting the next element into its correct position. It is efficient for small datasets or nearly sorted data due to its low overhead. Each element is picked and shifted leftward until it reaches the proper spot, allowing insertion sort to 'grow' a sorted portion of the array progressively from left to right. Its worst-case time complexity is O(n²), but it performs well on small or mostly ordered datasets.",
      topics: [
        "Insertion Process: Each element is taken and inserted into its correct position in the sorted portion of the array. The sorted portion grows with each new insertion, starting from the beginning of the array.",
        "Shifting Elements: Instead of swapping elements, insertion sort shifts larger elements one position to the right to make space for the element being inserted, minimizing the number of movements.",
        "Best Case (Nearly Sorted): Insertion Sort performs very efficiently on nearly sorted data with a best-case time complexity of O(n), as only a few elements need to be shifted.",
        "Time Complexity: The worst-case time complexity of insertion sort is O(n²) due to the nested loop structure, but it performs better than other O(n²) algorithms on smaller datasets.",
        "Applications: Insertion Sort is ideal for small datasets or arrays that are nearly sorted. It's also used in hybrid sorting algorithms (e.g., Timsort) for sorting smaller subarrays."
      ]
    },
    {
      _id: 10,
      file_name: "Merge sort",
      code: "Public/DS in C plus/code/46.Merge sort.cpp",
        explanation: "Merge Sort is a divide-and-conquer sorting algorithm that splits the input array into halves, recursively sorts each half, and then merges the sorted halves back together. It ensures that at each step of merging, the combined array is sorted. Merge Sort is efficient for large datasets and provides a stable sort with a time complexity of O(n log n) in all cases.",
        topics: [
          "Divide and Conquer: Merge Sort works by recursively dividing the array into smaller subarrays until each subarray has one element, which is inherently sorted.",
          "Merging: During the merging phase, two sorted subarrays are combined into a single sorted array by comparing the elements from each subarray and arranging them in the correct order.",
          "Recursive Nature: Merge Sort uses recursion for both dividing the array and merging the sorted subarrays. It requires additional memory for the temporary arrays used during merging.",
          "Time Complexity: Merge Sort has a time complexity of O(n log n) in the best, worst, and average cases, making it faster than algorithms like Bubble Sort or Insertion Sort for large datasets.",
          "Space Complexity: Merge Sort has a space complexity of O(n) due to the auxiliary arrays used during the merging process. This extra memory requirement can be a disadvantage compared to in-place algorithms like Quick Sort.",
          "Applications: Merge Sort is widely used in situations where stability is important, such as sorting linked lists, or when working with datasets that are too large to fit into memory (external sorting).",
          "Stability: Merge Sort is a stable sorting algorithm, meaning it preserves the relative order of equal elements in the sorted array."
        ]
      },
    {
      _id: 10,
      file_name: "Quick sort",
      code: "Public/DS in C plus/code/47.Quick sort.cpp",
      explanation: "Quick Sort is a highly efficient divide-and-conquer sorting algorithm that works by selecting a 'pivot' element, partitioning the array into two subarrays (elements less than the pivot and elements greater than the pivot), and recursively sorting the subarrays. Quick Sort is widely used because of its average-case time complexity of O(n log n) and in-place sorting capability, although its worst-case complexity is O(n²).",
      topics: [
        "Pivot Selection: The pivot element can be chosen in various ways, such as the first element, last element, a random element, or the median. The choice of pivot affects the algorithm's performance.",
        "Partitioning: The array is rearranged such that all elements less than the pivot are on its left and all elements greater than the pivot are on its right. The pivot is then placed in its correct sorted position.",
        "Divide and Conquer: Quick Sort recursively applies the same steps (partition and sort) to the left and right subarrays created by the pivot.",
        "In-Place Sorting: Quick Sort typically sorts the array in place, requiring minimal extra memory compared to algorithms like Merge Sort, which need additional space for merging.",
        "Time Complexity: Quick Sort has an average-case and best-case time complexity of O(n log n). However, in the worst case (e.g., when the pivot is the smallest or largest element repeatedly), the time complexity degrades to O(n²).",
        "Optimizations: To avoid the worst-case scenario, strategies like randomized pivot selection or the use of the median-of-three method can improve performance.",
        "Applications: Quick Sort is commonly used in scenarios where in-place sorting is required, such as in-memory sorting of large datasets. It is also used as a part of hybrid sorting algorithms like Introsort."
      ]
      }
  ];

  const data = await Promise.all(
    files.map(async (file) => ({
      _id: file._id,
      file_name: file.file_name,
      code: await sendCode(file.code), // Ensuring each call to sendCode is properly awaited
      explanation: file.explanation,
      topics: file.topics,
    }))
  );

  res.status(200).json(data);
} catch (error) {
  console.error("Error processing request:", error);
  res.status(500).json({ message: "Server error", error: error.message });
}
});

module.exports = app;
