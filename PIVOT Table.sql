
DECLARE @colnamelist NVARCHAR(Max) = ''
Select @colnamelist += QUOTENAME(StrikePrice)+ ',' from (Select DISTINCT StrikePrice from [TSLA_2021-07-30]) as SP;
SET @colnamelist = LEFT(@colnamelist, LEN(@colnamelist)-1)
DECLARE @SQLQuery NVARCHAR(MAX)
SET @SQLQuery = 
'select * from (
    select Cast(Timestamp as DATE) as TradingDate,CallPut,StrikePrice,Quantity from [TSLA_2021-07-30]
) t
PIVOT(
    Sum(Quantity) For StrikePrice In (' + @colnamelist + ')
) AS p
order by TradingDate'

EXEC(@SQLQuery)