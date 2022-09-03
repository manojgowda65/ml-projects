def replace_classes(df,columns,replace_with):
    for i in range(len(columns)):
        df[columns[i]]=df[columns[i]].map(replace_with[i])
    return df