#include <iostream>
using namespace std;

// Function to merge two sorted subarrays into a single sorted array
void merge(int array[], int start, int mid, int end) {
    int leftSize = mid - start + 1; // Size of the left subarray
    int rightSize = end - mid;     // Size of the right subarray

    // Create temporary arrays for left and right subarrays
    int leftArray[leftSize], rightArray[rightSize];

    // Copy data into the temporary arrays
    for (int i = 0; i < leftSize; i++)
        leftArray[i] = array[start + i];
    for (int i = 0; i < rightSize; i++)
        rightArray[i] = array[mid + 1 + i];

    // Merge the two temporary arrays back into the main array
    int leftIndex = 0, rightIndex = 0, mergeIndex = start;
    while (leftIndex < leftSize && rightIndex < rightSize) {
        if (leftArray[leftIndex] <= rightArray[rightIndex]) {
            array[mergeIndex++] = leftArray[leftIndex++];
        } else {
            array[mergeIndex++] = rightArray[rightIndex++];
        }
    }

    // Copy any remaining elements from the left subarray
    while (leftIndex < leftSize) {
        array[mergeIndex++] = leftArray[leftIndex++];
    }

    // Copy any remaining elements from the right subarray
    while (rightIndex < rightSize) {
        array[mergeIndex++] = rightArray[rightIndex++];
    }
}

// Function to implement merge sort algorithm
void mergeSort(int array[], int start, int end) {
    if (start < end) {
        int mid = start + (end - start) / 2; // Calculate the midpoint

        // Recursively sort the left and right subarrays
        mergeSort(array, start, mid);
        mergeSort(array, mid + 1, end);

        // Merge the sorted subarrays
        merge(array, start, mid, end);
    }
}

int main() {
    int numberOfElements;
    cout << "Enter the number of elements: ";
    cin >> numberOfElements;

    int array[numberOfElements];
    cout << "Enter the elements of the array: ";
    for (int i = 0; i < numberOfElements; i++) {
        cin >> array[i];
    }

    mergeSort(array, 0, numberOfElements - 1);

    cout << "Sorted array: ";
    for (int i = 0; i < numberOfElements; i++) {
        cout << array[i] << " ";
    }
    cout << endl;

    return 0;
}
