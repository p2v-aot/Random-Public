
select Sum(Quantity) as Daily_Volume, Min(UnderLastTradePrice) as UnderMinPrice, Max(UnderLastTradePrice) as UnderMaxPrice, MAX(Quantity) as AVGQuantity, Sum(Quantity * Price * 100) as TotalDollarSpend, Datepart(day, Timestamp) from [TSLA_2021-07-30]
group by datepart(day, Timestamp)
order by TotalDollarSpend desc

select Cast(Timestamp as DATE) as TradingDate,StrikePrice,CallPut,Count(Price) as Volume,AVG(Price) as AVGPrice,100-((FIRST_VALUE(AVG(Price)) OVER (PARTITION by StrikePrice order by CAST(Timestamp as Date))/ AVG(Price))*100) as AVGPriceDiff,AVG(UnderLastTradePrice) from [TSLA_2021-07-30]
where (StrikePrice = '550' OR StrikePrice = '600' OR StrikePrice = '625' OR StrikePrice = '650' OR StrikePrice = '675' OR StrikePrice = '700' OR StrikePrice = '750') and CallPut = 'C'
group by CAST(Timestamp as DATE), CallPut, StrikePrice
order by TradingDate

Select Timestamp,Price,CallPut,UnderLastTradePrice from [TSLA_2021-07-30] where StrikePrice = '600'
order by Timestamp

Select CAST(Timestamp as DATE) as TradeDate, StrikePrice, CallPut, Min(Price) as MinPrice, Max(Price) as MaxPrice, Count(Price) as Volume from [TSLA_2021-07-30]
group by CAST(Timestamp as DATE), StrikePrice, CallPut
order by TradeDate, StrikePrice,CallPut

select Cast(Timestamp as DATE) as TradingDate,CallPut,StrikePrice,Quantity from Daily_OpenInterest where ExpirationDate = '2021-07-30'
order by TradingDate, StrikePrice, CallPut

select Cast(Timestamp as DATE) as TradingDate, Sum(Price * Quantity * 100) as TotalOptionValue from [TSLA_2021-07-30]
group by CAST(Timestamp as Date)

select Sum(Price * Quantity * 100) from [TSLA_2021-07-30]

select * from [TSLA_2021-07-30]


