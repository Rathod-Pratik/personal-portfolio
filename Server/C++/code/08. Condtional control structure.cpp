#include<iostream>
using namespace std;
int main(){
    int a=10, b=20;
    /*if condition*/
    if(a<b){
        cout <<"a is smaller then b"<<endl;
    }

    /*if else condition*/
    if(a<b){
        cout << "a is smaller then b" <<endl;
    }
    else{
        cout << "a is bigger then b" <<endl;
    }

    /* if else ledder*/
    if(a<b){
        cout << "a is smaller then b" <<endl;
    }
    else if(a>b){
        cout << "b is bigger then a" <<endl;
    }
    else{
        cout<< "There both value is equal" <<endl;
    }


    /*Switch case */
    cout << "Enter value of c :"<< endl; 
    int c;
    cin >> c;
    switch(c){
        case 1:
        cout << "value of a is 1" <<endl;
        break;

        case 2:
        cout << "value of a is 2" <<endl;
        break;

        case 3:
        cout << "value of a is 3" <<endl;
        break;

        case 4:
        cout << "value of a is 4" <<endl;
        break;

        case 5:
        cout << "value of a is 5" <<endl;
        break;

        case 6:
        cout << "value of a is 6" <<endl;
        break;

        case 7:
        cout << "value of a is 7" <<endl;
        break;

        case 8:
        cout << "value of a is 8" <<endl;
        break;

        case 9:
        cout << "value of a is 9" <<endl;
        break;

        case 10:
        cout << "value of a is 10" <<endl;
        break;
    }

    /*Ternary operator*/

    cout << ((a<b)?"a is bigger then b":"b is bigger then a") <<endl;
}