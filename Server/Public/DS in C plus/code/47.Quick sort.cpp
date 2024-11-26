#include <iostream>
using namespace std;

// Function prototype for partition
int partition(int element[], int left, int right);
void QuickSort(int element[], int left, int right);
void QuickSort(int element[], int left, int right) {
    if (left < right) {
        // Partition the array and get the pivot position
        int location = partition(element, left, right);

        // Recursively sort the left and right subarrays
        QuickSort(element, left, location - 1);
        QuickSort(element, location + 1, right);
    }
}

int partition(int element[], int left, int right) {
    int pivot = element[left];
    int start = left + 1; // Start scanning from the next element
    int end = right;

    while (start <= end) {
        while (start <= end && element[start] <= pivot) {
            start++;
        }
        while (start <= end && element[end] > pivot) {
            end--;
        }
        if (start < end) {
            // Swap elements to maintain the partition
            swap(element[start], element[end]);
        }
    }
    // Place the pivot in its correct position
    swap(element[left], element[end]);
    return end; // Return the pivot index
}

int main() {
    int array[5];

    cout << "Enter 5 elements: ";
    for (int i = 0; i < 5; i++) {
        cin >> array[i];
    }

    QuickSort(array, 0, 4);

    cout << "Sorted Array: ";
    for (int i = 0; i < 5; i++) {
        cout << array[i] << " ";
    }
    cout << endl;

    return 0;
}
