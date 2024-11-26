#include<iostream>
using namespace std; 
//This function protoType
int Myfun(int a,int b);  

// function call by reference
int reference(int & x){
	x++;
}

// Function  return by reference
int& change(int* arr,int i ){ 
	return arr[i];
}

//default argument in function
int defaultsum(int a=12,int b=12){
	cout << a+b <<endl;
}

//Function overloading
int sum(int a,int b){
	cout << a+b<<endl;
}
int sum(double a,double b){
	cout<< a+b <<endl;
}

//Inline function
inline void average(int a,int b,int c){
    float d=(a+b+c)/3;
    cout <<d<<endl;
}
int main(){
	/*call function by reference  */
	int a=10;
	reference(a); 
	cout << a <<endl;
	
	/*function return by reference*/
	int arr[5]={1,2,3,4,5};
	change(arr,2)=187;
	cout << arr[2] <<endl;
	
	/*default argument in function*/
	defaultsum();
	
	/*Function overloading*/
	sum(15,18);
	sum(15.8,7.128);	
	
	/*Inline function*/
	average(10,20.5,12);
	
}
