import pandas as pd

def replace_classes(df,columns,replace_with):
    for i in range(len(columns)):
        df[columns[i]]=df[columns[i]].map(replace_with[i])
    return df


def find_na(df,all_inp_features=[]):
    lst=[]
    if(len(all_inp_features)==0):
        all_inp_features=df.columns
    for x in all_inp_features:
        s=df[[x]].isna().sum()
        if s[0]>1:
            f={'feature':x,'NaN Count':s[0],'% out of total population':round((s[0]/df.shape[0])*100,2)}
            lst.append(f)
    d_na_ = pd.DataFrame(lst)
    return d_na_

def drop_col_inplace(df_arr,columns):
    for df in df_arr:
        df.drop(columns,axis=1,inplace=True)