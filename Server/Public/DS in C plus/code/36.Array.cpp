#include <iostream>
using namespace std;
int main()
{
    int i, j,k;
    // one Dimensional array
    int a[5] = {10, 20, 30, 40, 50};
    cout<<"one Dimensional array"<<endl;
    for (i = 0; i < 5; i++)
    {
        cout << a[i] << endl;
    }

    // Two dimensional array
    int b[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}};
cout<<"Two dimensional array"<<endl;
    for (i = 0; i < 3; i++)
    {
        for (j = 0; j < 3; j++)
        {
            cout << b[i][j] << "  ";
        }
        cout << endl;
    }

    // Multi Dimensional array
    int c[2][3][3] = {
        {{1, 2, 3},
         {4, 5, 6},
         {7, 8, 9}},
        {{10, 11, 12},
         {13, 14, 15},
         {16, 17, 17}}
    };

cout<<"Multi Dimensional array"<<endl;
    for (i = 0; i < 2; i++)
    {
        for (j = 0; j < 3; j++)
        {
            for (k = 0; k < 3; k++)
            {
                cout << c[i][j][k] << "  ";
            }
            cout<<endl;
        }
    }
}