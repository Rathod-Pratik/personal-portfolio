#include <iostream>
using namespace std;

int n = 5; // Size of the array

// Function to perform selection sort
void SelectionSort(int array[]) { // Corrected function name
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i; // Assume the current element is the minimum
        for (int j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) { // Change to < for ascending order
                minIndex = j;
            }
        }
        // Swap the elements if a new minimum is found
        if (minIndex != i) {
            int temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
        }
    }
}

// Function to print array elements
void print_Value(int array[]) {
    for (int i = 0; i < n; i++) {
        cout << array[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[n];
    cout << "Enter " << n << " values one by one:" << endl;

    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    SelectionSort(arr); // Sort the array in ascending order
    cout << "Sorted array in ascending order: ";
    print_Value(arr); // Print the sorted array

    return 0;
}
